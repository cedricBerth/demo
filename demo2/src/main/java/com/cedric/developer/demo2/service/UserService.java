package com.cedric.developer.demo2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cedric.developer.demo2.entity.User;
import com.cedric.developer.demo2.repository.UserRepository;

@Service("UserService")
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User addUser(User user) {
		return userRepository.save(user);
	}

	public User findById(Long id) {
		return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Failed to get an user with the id=" + id + "!!!"));
	}

	public User findByUsername(String username) {
		return userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("Failed"));
	}

	public User updateUser(User user, Long id) {
		if (id > 0) {
			user.setId(id);
			if (findById(user.getId()) != null) {
				user = userRepository.save(user);
			}
		}
		return user;
	}

	public void deleteUser(User user, Long id) {
		if (id > 0) {
			user.setId(id);
			if (findById(user.getId()) != null) {
				userRepository.delete(user);
			}
		}
	}

	public List<User> findAllUsers() {
		return userRepository.findAll();
	}

}
